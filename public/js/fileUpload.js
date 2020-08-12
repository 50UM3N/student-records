// Register the plugin
FilePond.registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginImageTransform,
  FilePondPluginImageResize,
  FilePondPluginFileMetadata,
  FilePondPluginFileValidateSize,
  FilePondPluginFileValidateType,
  FilePondPluginFileEncode,
  FilePondPluginFileRename,
  FilePondPluginImageCrop
);
const inputElement = document.querySelector('input[type="file"]');
const pond = FilePond.create(inputElement, {
  labelIdle:
    'Drag & Drop your Image or <span class="filepond--label-action"> Browse </span>',
  allowImageResize: true,
  imageResizeTargetWidth: 500,
  imageResizeMode: "cover",
  allowFileSizeValidation: true,
  minFileSize: "10KB",
  maxFileSize: "1024KB",
  labelMaxFileSize: "Maximum file size is {filesize}",
  allowFileTypeValidation: true,
  acceptedFileTypes: ["image/png", "image/jpeg", "image/gif"],
  labelFileTypeNotAllowed: "File of invalid type",
  fileValidateTypeLabelExpectedTypes: "Expects {allButLastType} or {lastType}",
  stylePanelAspectRatio: "1:1",
  allowFileRename: true,
  fileRenameFunction: (file) => {
    return `image${file.extension}`;
  },
  allowImageCrop: true,
  imageCropAspectRatio: "1:1",
});
const hiddenInput = document.getElementById("hiddenInput");
if (hiddenInput) {
  pond
    .addFile(hiddenInput.value)
    .then((file) => {})
    .catch((error) => {
      console.log(error);
    });
}
