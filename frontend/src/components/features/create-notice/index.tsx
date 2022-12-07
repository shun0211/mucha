import React, { useState } from "react";
import { Card, Select, Switch, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { DateTimePicker } from "mantine-dates-6";
import RequiredLabel from "../../ui-elements/RequiredLabel";
import MainButton from "../../ui-elements/MainButton";
import DraftButton from "../../ui-elements/DraftButton";
import { postNotice } from "./api/postNotice";
import {
  NotAcceptableError,
  UnauthorizedError,
} from "../../../utils/custom-errors";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const CreateNotice = () => {
  const router = useRouter();
  const repeatValue = [
    { value: false, label: "しない" },
    { value: true, label: "する" },
  ];
  const [repeated, setRepeated] = useState(false);
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
    talkType: string
  ) => {
    await postNotice(
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
      talkType
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
            'scheduled',
            'dm'
          );
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
          label="メッセージ"
          minRows={5}
          radius="md"
          className="py-2"
          {...form.getInputProps("message")}
        />

        <div className="flex gap-x-3">
          <DraftButton text="下書き保存" type="submit" />
          <MainButton text="登録する" type="submit" />
        </div>
      </form>
    </Card>
  );
};

export default CreateNotice;
