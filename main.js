const hash = Date.now().toString();

var slideshow = remark.create({
  sourceUrl: `/slides.md?${hash}`
});