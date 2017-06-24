$( document ).ready(function() {
  $("#search").click(function(event) {
    event.preventDefault();
    var gemSearch = $("form input").val();
    $(".request-output").remove();

  // To access each dependencies
  // data.dependencies.development.forEach(function(element) {
  //   console.log(element.name);
  // });
    $.ajax({
      type: "GET",
      dataType: "json",
      url: "https://rubygems.org/api/v1/gems/" + gemSearch + ".json",

      success: function (data) {
        var gemName = data.name;
        var gemDescription = data.info;
        var gemLink = data.gem_uri;
        var gemDepencies = [];

        if (data.dependencies.development.length !== 0) {
          data.dependencies.development.forEach(function(element) {
            gemDepencies.push(element.name);
          });
        }

        $(".gem-information").append("<div class='request-output'><div>" + gemName + "</div><div><div>INFORMATION</div><div>" + gemDescription + "</div><div class='dependencies'>DEPENDENCIES</div></div>");

        function appendDependencies() {
          if (gemDepencies.length !== 0) {
            gemDepencies.forEach(function(element) {
              $(".dependencies").append("<p>" + element + "</p>");
            });
          }
        }

        appendDependencies();

      },
      error: function (error) {
      }
    })
    .fail(function() {
      $(".gem-information").append("<div class='request-output'><p>Oh no! Looks like that gem can't be found.</p></div>");
    });
  });
});
