import {
  Button,
  Card,
  Select,
  Switch,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import dayjs from "dayjs";
import { DateTimePicker } from "mantine-dates-6";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import useNotice from "../../../../hooks/useNotice";
import { AuthContext } from "../../../../providers/AuthContext";
import MainButton from "../../../ui-elements/MainButton";
import RequiredLabel from "../../../ui-elements/RequiredLabel";
import SkeletonElement from "../../../ui-elements/SkeletonElement";
import { updateNotice } from "../hooks/updateNotice";

const EditNotice = () => {
  const { token } = useContext(AuthContext);

  const router = useRouter();
  const { noticeId } = router.query;
  const { notice, isLoading } = useNotice(parseInt(noticeId as string), token);

  const form = useForm({
    initialValues: {
      title: "",
      scheduledAt: dayjs().toDate(),
      repeat: false,
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
      message: "",
    },
  });

  useEffect(() => {
    if (notice) {
      form.setFieldValue("title", notice.title);
      form.setFieldValue("scheduledAt", dayjs(notice.scheduledAt).toDate());
      form.setFieldValue("repeat", notice.repeat);
      form.setFieldValue("monday", notice.monday);
      form.setFieldValue("tuesday", notice.tuesday);
      form.setFieldValue("wednesday", notice.wednesday);
      form.setFieldValue("thursday", notice.thursday);
      form.setFieldValue("friday", notice.friday);
      form.setFieldValue("saturday", notice.saturday);
      form.setFieldValue("sunday", notice.sunday);
      form.setFieldValue("message", notice.message);
    }
  }, [isLoading]);

  const repeatValue = [
    { value: false, label: "しない" },
    { value: true, label: "する" },
  ];
  const [repeated, setRepeated] = useState(false);

  if (!notice) return <SkeletonElement />;

  return (
    <Card shadow="md" radius="lg" className="pb-8">
      <form
        onSubmit={form.onSubmit((values) => {
          updateNotice(
            notice.id,
            values.title,
            values.scheduledAt,
            values.repeat,
            values.monday,
            values.tuesday,
            values.wednesday,
            values.thursday,
            values.friday,
            values.saturday,
            values.sunday,
            values.message,
            "scheduled",
            token
          );
          router.push("/notices");
          toast.success("リマインドを設定しました！");
        })}
      >
        <TextInput
          required
          label="タイトル"
          placeholder="飲み会"
          radius="md"
          {...form.getInputProps("title")}
        />

        <div className="py-2">
          <RequiredLabel text="リマインド日時" />
          <DateTimePicker
            placeholder="日時を選択してください"
            dropdownType="modal"
            locale="ja"
            radius="md"
            {...form.getInputProps("scheduledAt")}
          />
        </div>

        <Select
          label="繰り返し"
          required
          radius="md"
          data={repeatValue}
          {...form.getInputProps("repeat")}
          onChange={(value: boolean) => {
            if (value === true) {
              setRepeated(true);
              form.setFieldValue("repeat", true);
            } else {
              setRepeated(false);
              form.setFieldValue("repeat", false);
            }
          }}
        />

        <div className={repeated ? "" : "hidden"}>
          <div className="flex gap-x-5">
            <Switch
              label="月曜"
              color="yellow"
              {...form.getInputProps("monday")}
            />
            <Switch
              label="火曜"
              color="yellow"
              {...form.getInputProps("tuesday")}
            />
            <Switch
              label="水曜"
              color="yellow"
              {...form.getInputProps("wednesday")}
            />
          </div>

          <div className="flex gap-x-5">
            <Switch
              label="木曜"
              color="yellow"
              {...form.getInputProps("thursday")}
            />
            <Switch
              label="金曜"
              color="yellow"
              {...form.getInputProps("friday")}
            />
            <Switch
              label="土曜"
              color="yellow"
              {...form.getInputProps("saturday")}
            />
          </div>

          <Switch
            label="日曜"
            color="yellow"
            {...form.getInputProps("sunday")}
          />
        </div>

        <Textarea
          label={`メッセージ\n(LINEで送るメッセージを入力してください)`}
          minRows={5}
          radius="md"
          className="py-2 whitespace-pre-wrap"
          {...form.getInputProps("message")}
        />

        <div className="flex gap-x-3">
          <Button
            color="gray.6"
            className="text-white text-lg my-4 disabled:bg-draft-button disabled:text-white"
            type="button"
            radius="md"
            onClick={() => {
              updateNotice(
                notice.id,
                form.values.title,
                form.values.scheduledAt,
                form.values.repeat,
                form.values.monday,
                form.values.tuesday,
                form.values.wednesday,
                form.values.thursday,
                form.values.friday,
                form.values.saturday,
                form.values.sunday,
                form.values.message,
                "draft",
                token!
              );
              router.push("/notices?type=draft");
              toast.success("下書きを更新しました！");
            }}
          >
            下書き保存
          </Button>
          <MainButton text="更新する" type="submit" />
        </div>
      </form>
    </Card>
  );
};

export default EditNotice;
