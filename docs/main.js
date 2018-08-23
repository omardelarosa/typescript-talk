const hash = Date.now().toString();

var slideshow = remark.create({
  sourceUrl: `/docs/slides.md?${hash}`
});