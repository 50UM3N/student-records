const imageTypes = ["image/jpeg", "image/png", "images/gif"];
// image to buffer converter midileware
function imageToBase64(req, res, next) {
  const image = req.body.image;
  let imageType, imageData;
  const studentImage = JSON.parse(image);
  if (studentImage != null && imageTypes.includes(studentImage.type)) {
    imageData = new Buffer.from(studentImage.data, "base64");
    imageType = studentImage.type;
    req.body.imageData = imageData;
    req.body.imageType = imageType;
    return next();
  } 
  else {
    req.flash({ msg: "Error uploading image" });
    res.redirect(req.originalUrl);
  }
}

// for calculating the age
function calculate_age(birth) {
  var birthDate = new Date(birth);
  var cur = new Date();
  var diff = cur - birthDate;
  var age = Math.floor(diff / 31557600000);
  return Number(age);
}

module.exports = {
  imageToBase64,
  calculate_age,
};
