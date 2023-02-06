import React, { useEffect, useState } from "react";

interface FilePreviewState {
  imgSrcList: string[];
  setImgSrcList: React.Dispatch<React.SetStateAction<string[]>>;
}

const useFilePreview = (
  files: FileList[],
  length: number
): FilePreviewState => {
  const [imgSrcList, setImgSrcList] = useState<string[]>([]);

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
