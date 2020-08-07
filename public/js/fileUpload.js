console.log("Uploader Update");

function alertClose(e) {
  e.parentElement.style.display = "none";
}
// register the plugin for filepond
FilePond.registerPlugin(
  FilePondPluginImageResize,
  FilePondPluginImagePreview,
  FilePondPluginFileEncode
);

// get the input element
const inputElement = document.querySelector('input[type="file"]');
FilePond.setOptions({
  labelIdle:
    'Drag & Drop The picture or <span class="filepond--label-action">Browse Your PC</span>',
  stylePanelAspectRatio: 1 / 1,
});
// resize the file
const pond = FilePond.create(inputElement, {
  imageResizeTargetWidth: 200,
});
