export default defineBackground(() => {
  console.log("Background script initialized", { id: browser.runtime.id });
});
