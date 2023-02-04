import React, { useEffect, useState } from "react";

interface FilePreviewState {
  imgSrcList: string[] | null;
  setImgSrcList: React.Dispatch<React.SetStateAction<string[] | null>>;
}

const useFilePreview = (
  files: FileList[],
  length: number
): FilePreviewState => {
  const [imgSrcList, setImgSrcList] = useState<string[] | null>(null);

  useEffect(() => {
    console.log(`ファイル数: ${files}`);

    const newImgSrcList = files
      .filter((file) => file && file[0])
      .map((file) => URL.createObjectURL(file[0]));

    setImgSrcList(newImgSrcList);
  }, [length]);

  return { imgSrcList, setImgSrcList };
};

export default useFilePreview;
