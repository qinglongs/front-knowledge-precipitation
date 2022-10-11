import { UploadProps } from "antd/lib/upload";
declare type PostFile<Response> = (formData: FormData, onprogress: any) => Promise<Response>;
declare type UseUploadFile = <T>(postFile: PostFile<T>, { isBreak, fileLength, getBreakInfo, }: {
    isBreak?: boolean;
    fileLength?: number;
    getBreakInfo?: (filename: string) => Promise<Record<"data", number>>;
}) => {
    uploadProps: UploadProps;
    loading: boolean;
    progress: number;
};
declare const useUploadFile: UseUploadFile;
export default useUploadFile;
