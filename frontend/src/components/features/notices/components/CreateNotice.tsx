import React, { useState } from "react";
import {
  Anchor,
  Button,
  Card,
  Select,
  Switch,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DateTimePicker } from "mantine-dates-6";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { TalkType, User } from "../../../../types";
import { useNoticeTargetData } from "../../../../hooks/useNoticeTargetData";
import {
  NotAcceptableError,
  UnauthorizedError,
} from "../../../../utils/custom-errors";
import RequiredLabel from "../../../ui-elements/RequiredLabel";
import MainButton from "../../../ui-elements/MainButton";
import { postNotice } from "../hooks/postNotice";
import { Help } from "tabler-icons-react";
import { postDraftNotice } from "../hooks/postDraftNotice";
import SkeletonElement from "../../../ui-elements/SkeletonElement";

const CreateNotice = ({ user, token }: { user: User; token: string }) => {
  const router = useRouter();
  const repeatValue = [
    { value: false, label: "しない" },
    { value: true, label: "する" },
  ];
  const [repeated, setRepeated] = useState(false);
  const noticeTargetData = useNoticeTargetData(user, token);
  const [talkType, setTalkType] = useState<TalkType>("dm");

  const form = useForm({
    initialValues: {
      title: "",
      scheduledAt: "",
      repeat: false,
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: true,
      message: "",
      toLineId: user.lineUserId,
    },
  });

  const addNotice = async (
    title: string,
    scheduledAt: string,
    repeat: boolean,
    monday: boolean,
    tuesday: boolean,
    wednesday: boolean,
    thursday: boolean,
    friday: boolean,
    saturday: boolean,
    sunday: boolean,
    message: string,
    status: string,
    talkType: TalkType,
    toLineId: string
  ) => {
    await postNotice(
      user.id,
      token,
      title,
      scheduledAt,
      repeat,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
      message,
      status,
      talkType,
      toLineId
    ).catch((e) => {
      if (e instanceof UnauthorizedError) {
        toast.error(e.errorMessage);
      } else if (e instanceof NotAcceptableError) {
        e.errorMessages.map((message: string) => toast.error(message));
      }
      throw e;
    });
    router.push("/notices");
    toast.success("登録しました😊");
  };

  return (
    <Card shadow="md" radius="lg" className="pb-8">
      <form
        onSubmit={form.onSubmit((values) => {
          addNotice(
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
            talkType,
            values.toLineId
          );
        })}
      >
        {noticeTargetData === null ? (
          <SkeletonElement />
        ) : (
          <Select
            label="💬 送付先"
            data={noticeTargetData}
            defaultValue="DM"
            className="py-2"
            {...form.getInputProps("toLineId")}
            onChange={(value: React.ChangeEvent<HTMLSelectElement>) => {
              form.setFieldValue("toLineId", String(value));
              if (String(value) === user.lineUserId) {
                setTalkType("dm");
              } else {
                setTalkType("groupTalk");
              }
            }}
          />
        )}
        <div className="flex">
          <Help size={20} strokeWidth={2} color={"black"} className="pr-1" />
          <Text fz="xs">
            グループラインに送信する場合はまず
            <Anchor href="/help/group-talk-linkage" target="_blank">
              こちら
            </Anchor>
            に従ってグループトークに招待を行ってください
          </Text>
        </div>

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
            className="text-white text-lg my-4"
            type="button"
            radius="md"
            onClick={() => {
              postDraftNotice(
                token,
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
                talkType,
                form.values.toLineId,
                router
              );
            }}
          >
            下書きに保存
          </Button>
          <MainButton text="登録する" type="submit" />
        </div>
      </form>
    </Card>
  );
};

export default CreateNotice;
