module.exports = function (router) {
    // This route renders the homepage
    router.get("/", (req, res) => {
        res.render("home");
    });
    router.get("/saved", (req, res) => {
        res.render("saved");
    });
}