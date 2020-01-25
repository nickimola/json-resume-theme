var fs = require("fs");
var Handlebars = require("handlebars");
var Moment = require("moment");

Handlebars.registerHelper("prettifyDate", function(resumeDate) {
  if (!resumeDate) {
    return "Present";
  }
  var newDate = Moment(resumeDate).format("MMM YYYY");
  return newDate;
});

Handlebars.registerHelper("calculateYears", function(startDate, endDate) {
  var end = endDate ? Moment(endDate) : Moment();
  var start = Moment(startDate);
  var years = end.diff(start, "year");
  start.add(years, "years");
  var months = end.diff(start, "months");
  start.add(months, "months");
  var days = end.diff(start, "days");

  var formattedYears = years > 0 ? years + " years " : "";
  var formattedMonths = months > 0 ? months + " months " : "";
  var formattedDays = days > 0 ? days + " days" : "";

  return formattedYears + formattedMonths + formattedDays;
});

function render(resume) {
  var css = fs.readFileSync(__dirname + "/style.css", "utf-8");
  var template = fs.readFileSync(__dirname + "/resume.template", "utf-8");
  return Handlebars.compile(template)({
    css: css,
    resume: resume
  });
}

module.exports = {
  render: render
};
