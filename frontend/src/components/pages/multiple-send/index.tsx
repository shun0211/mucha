import { Card, Container, Textarea } from "@mantine/core";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { CircleMinus, CirclePlus } from "tabler-icons-react";
import { AuthContext } from "../../../providers/AuthContext";
import Header from "../../ui-elements/Header";
import MainButton from "../../ui-elements/MainButton";
import MainText from "../../ui-elements/MainText";
import NavigationBottom from "../../ui-elements/NavigationBottom";
import PageTitle from "../../ui-elements/PageTitle";
import { useFieldArray, useForm } from "react-hook-form";
import useFilePreview from "../../../hooks/useFilePreview";
import Image from "next/image";

interface FormValues {
  messages: { text: string | null; file: FileList | null; type: "text" | "file" }[];
}

const MultipleSend = () => {
  const { liff } = useContext(AuthContext);
  const { register, control, watch } = useForm<FormValues>({
    defaultValues: {
      messages: [
        { text: "", file: null, type: "text" },
        { text: null, file: null, type: "file" },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "messages",
    rules: { maxLength: 5 },
  });

  //   messages: {
  //     text: string | null;
  //     file: FileList | null;
  //   }[]

  const messages = watch(["messages"])[0];
  const fileList = messages
    .map((message) => message.file)
    .filter((file): file is FileList => file != null);
  const { imgSrcList } = useFilePreview(fileList, fileList.length);
  console.log(`imgSrcList: ${imgSrcList}`);
  console.log(messages);

  if (!liff) return null;

  const buildSendMessagesParams = (fields) => {
    return fields.map((field) => {
      if (field.type === "text") {
        return {
          type: "text",
          text: field.text,
        };
      } else {
        return {
          type: "file",
          originalContentUrl: field.file,
          previewImageUrl: field.file,
        };
      }
    })
  }

  const selectDestinations = () => {
    if (liff.isLoggedIn()) {
      if (liff.isApiAvailable("shareTargetPicker")) {
        liff
          .shareTargetPicker(
            buildSendMessagesParams(fields),
            {
              isMultiple: true,
            }
          )
          .then((res) => {
            if (res) {
              toast.success("メッセージを送信しました😊");
            }
          })
          .catch((error) => {
            toast.error("予期せぬエラーが起きました");
            console.log(error);
          });
      }
    } else {
      liff.login();
    }
  };

  const textInput = (field, index) => {
    if (field.type === "text") {
      return (
        <>
          <div className="my-3">
            <CirclePlus
              size={28}
              strokeWidth={2}
              color={"#FFDC00"}
              onClick={() => append({ text: "", file: null, type: "text" })}
            />
            <CircleMinus
              size={28}
              strokeWidth={2}
              color={"#FFDC00"}
              onClick={() => remove(index)}
            />
          </div>
          <Textarea
            className="col-span-8 w-full"
            {...register(`messages.${index}.text`)}
          />
        </>
      );
    }
  };

  const imageInput = (field, index) => {
    if (field.type === "file") {
      return (
        <input
          type="file"
          {...register(`messages.${index}.file`)}
          placeholder="画像を選択"
          multiple
        />
      );
    }
  };

  return (
    <>
      <Header />
      <PageTitle>メッセージ一斉送信</PageTitle>
      <Container>
        <Card shadow="md" radius="lg" className="pb-8">
          <MainText
            text={`メッセージ\n(個人のアカウントが送信したかのように、グループまたは友だちに表示されます。)`}
          />
          <div className="grid grid-cols-9 place-items-center">
            {fields.map((field: any, index: number) => textInput(field, index))}
          </div>

          <div>
            {fields.map((field: any, index: number) =>
              imageInput(field, index)
            )}
          </div>

          {imgSrcList?.map((imgSrc, idx) => (
            <Image
              src={imgSrc}
              key={idx}
              alt="プレビュー"
              width={200}
              height={200}
            />
          ))}

          <MainButton
            text="送信先を選択"
            type="button"
            onClick={selectDestinations}
          />
        </Card>
      </Container>
      <NavigationBottom />
    </>
  );
};

export default MultipleSend;
