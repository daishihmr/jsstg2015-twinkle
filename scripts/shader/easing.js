(function() {

    module.exports = [

        "float easeInQuad(float t) {",
        "  return t * t;",
        "}",

        "float easeOutQuad(float t) {",
        "  return -t * (t - 2.0);",
        "}",

        "float easeInOutQuad(float t) {",
        "  float p = 2.0 * t * t;",
        "  return t < 0.5 ? p : -p + (4.0 * t) - 1.0;",
        "}",

    ].join("\n");
})();
