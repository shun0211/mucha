import { Card, Container, Input, Textarea } from "@mantine/core";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { CircleMinus, CirclePlus } from "tabler-icons-react";
import { AuthContext } from "../../../providers/AuthContext";
import Header from "../../ui-elements/Header";
import MainButton from "../../ui-elements/MainButton";
import MainText from "../../ui-elements/MainText";
import PageTitle from "../../ui-elements/PageTitle";
import { FieldArrayWithId, useFieldArray, useForm } from "react-hook-form";
import useFilePreview from "../../../hooks/useFilePreview";
import Image from "next/image";
import NavigationBottom from "../../features/common/components/NavigationBottom";
import LiffNavigationBottom from "../../ui-elements/LiffNavigationBottom";

interface FormValues {
  messages: {
    text: string | null;
    file: FileList | null;
    type: "text" | "file";
  }[];
}

interface TextParams {
  type: "text";
  text: string;
}

interface ImageParams {
  type: "image";
  originalContentUrl: string;
  previewImageUrl: string;
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
  });

  const messages = watch(["messages"])[0];
  const fileList = messages
    .map((message) => message.file)
    .filter((file): file is FileList => file != null);
  const { imgSrcList } = useFilePreview(fileList, fileList.length);

  if (!liff) return null;

  const buildSendMessagesParams = (): (TextParams | ImageParams)[] => {
    const sendMessageParams: (TextParams | ImageParams)[] = [];
    messages.forEach((message) => {
      if (message.type === "text") {
        sendMessageParams.push({
          type: "text",
          text: message.text || "",
        });
      }
    });

    // messages.forEach((message) => {
    //   sendMessageParams.push({
    //     type: "image",
    //     originalContentUrl: 'https://mucha.s3.ap-northeast-1.amazonaws.com/logo-only-image.png',
    //     previewImageUrl: 'https://mucha.s3.ap-northeast-1.amazonaws.com/logo-only-image.png',
    //   });
    // });
    return sendMessageParams;
  };

  const selectDestinations = () => {
    if (liff.isLoggedIn()) {
      if (liff.isApiAvailable("shareTargetPicker")) {
        liff
          .shareTargetPicker(buildSendMessagesParams(), {
            isMultiple: true,
          })
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

  const textInput = (
    field: FieldArrayWithId<FormValues, "messages", "id">,
    index: number
  ) => {
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
            autosize
            minRows={2}
            className="col-span-8 w-full"
            {...register(`messages.${index}.text`)}
          />
        </>
      );
    }
  };

  const imageInput = (
    field: FieldArrayWithId<FormValues, "messages", "id">,
    index: number
  ) => {
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
            {fields.map(
              (
                field: FieldArrayWithId<FormValues, "messages", "id">,
                index: number
              ) => textInput(field, index)
            )}
          </div>

          <div>
            {/* {fields.map(
              (
                field: FieldArrayWithId<FormValues, "messages", "id">,
                index: number
              ) => imageInput(field, index)
            )} */}
          </div>

          {/* {imgSrcList?.map((imgSrc, idx) => (
            <Image
              src={imgSrc}
              key={idx}
              alt="プレビュー"
              width={200}
              height={200}
            />
          ))} */}

          <MainButton
            text="送信先を選択"
            type="button"
            onClick={selectDestinations}
          />
        </Card>
      </Container>
      <LiffNavigationBottom />
    </>
  );
};

export default MultipleSend;
