import React, { useState } from "react";
import PageTitle from "../../ui-elements/PageTitle";
import Header from "../../ui-elements/Header";
import {
  Card,
  Container,
  Select,
  Switch,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DateTimePicker } from "mantine-dates-6";
import RequiredLabel from "../../ui-elements/RequiredLabel";
import MainButton from "../../ui-elements/MainButton";
import DraftButton from "../../ui-elements/DraftButton";

const PagesNoticesNew = () => {
  const repeatValue = [
    { value: false, label: "しない" },
    { value: true, label: "する" },
  ];
  const [repeated, setRepeated] = useState(false);
  const form = useForm({
    initialValues: {
      title: "",
      sentAt: 0,
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
    title,
    sentAt,
    repeat,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
    message
  ) => {};

  return (
    <>
      <Header />
      <PageTitle>リマインド作成</PageTitle>

      <Container>
        <Card shadow="md" radius="lg" className="pb-8">
          <form
            onSubmit={form.onSubmit((values) => {
              addNotice(
                values.title,
                values.sentAt,
                values.repeat,
                values.monday,
                values.tuesday,
                values.wednesday,
                values.thursday,
                values.friday,
                values.saturday,
                values.sunday,
                values.message
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
                  setRepeated(true)
                  form.setFieldValue("repeat", true)
                } else {
                  setRepeated(false)
                  form.setFieldValue("repeat", false)
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
          </form>

          <div className="flex gap-x-3">
            <DraftButton text="下書き保存" type="button" />
            <MainButton text="登録する" type="button" />
          </div>
        </Card>
      </Container>
    </>
  );
};

export default PagesNoticesNew;
