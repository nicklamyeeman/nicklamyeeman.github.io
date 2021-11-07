function validateForm()
{
    var num = document.forms["add_number"]["number"].value;
    console.log(num);
    return false;
}

function validateGrid()
{
    /* Create new grid from the form */
    var new_grid = [[], [], []];
    var inputs = ["num1", "num2", "num3", "num4", "num5", "num6", "num7", "num8", "num9",
                  "num10", "num11", "num12", "num13", "num14", "num15", "num16", "num17", "num18",
                  "num19", "num20", "num21", "num22", "num23", "num24", "num25", "num26", "num27"];
    var it = 0;
    var grid_id = document.forms["add_grid"]["grid_id"].value;

    for (var i = 0; i != 3; i++) {
        for (var j = 0; j != 9; it++, j++)
            new_grid[i][j] = document.forms["add_grid"][inputs[it]].value;
    }

    /* Check validity of the new grid */
    // var values = [];

    // if (grid_id.length != 5 || isNaN(grid_id)) {
    //     alert("Veuillez renseigner le bon numéro de votre grille situé en bas à gauche.");
    //     return false;
    // }

    // for (var i = 0; i != 3; i++) {
    //     for (var j = 0; j != 9; it++, j++) {
    //         if (isNaN(new_grid[i][j])) {
    //             alert("La grille n'est pas correcte.\nAssurez-vous d'avoir uniquement des nombres dans votre grille !");
    //             return false;
    //         }
    //         else if (parseInt(new_grid[i][j]) >= 1 && parseInt(new_grid[i][j]) <= 90)
    //             values.push(parseInt(new_grid[i][j]));
    //         else if (new_grid[i][j] == "");
    //         else {
    //             alert("La grille n'est pas correcte.\nLes nombres doivent être entre 1 et 90 !")
    //             return false;
    //         }
    //     }
    // }
    // if (values.length == 15) {
    //     values.sort();
    //     for (var v = 0; v < values.length; v++) {
    //         if (values[v + 1] == values[v]) {
    //             alert("La grille n'est pas correcte.\nIl doit y avoir 15 numéros différents !");
    //             return false;
    //         }
    //     }
    // } else {
    //     alert("La grille n'est pas correcte.\nIl doit y avoir 15 numéros valides !");
    //     return false;
    // }

    /* Store new grid in local storage */
    var grids = localStorage.getItem("grids");

    if (grids == null)
        grids = [new_grid];
    else {
        grids = JSON.parse(grids);
        grids[grids.length] = new_grid;
    }
    localStorage.setItem("grids", JSON.stringify(grids));
}

function onLoad()
{
    /* Get grids from local storage */
    var grids = localStorage.getItem("grids");

    if (grids == null)
        return;
    grids = JSON.parse(grids);

    /* Create table in divs for each grid */
    for (var i = 0; i != grids.length; i++) {
        var div = document.createElement('div');
        var table = document.createElement('table');
        table.className = "grid";
    
        /* Add rows and cells for the table for each element of the grid */
        for (var j = 0; j != 3; j++) {
            var row = document.createElement('tr');
            for (var k = 0; k != 9; k++) {
                var cell = document.createElement('td');
                cell.appendChild(document.createTextNode(""+grids[i][j][k]));
                row.appendChild(cell);
            }
            table.appendChild(row);
        }
        div.appendChild(table);

        /* Add a delete button to delete teh grid */
        var button = document.createElement('button');
        button.className = "delete_button";
        button.type = "button";
        button.id = "" + i;
        button.onclick = deleteGrid;
        div.appendChild(button);

        /* Append child everything to the "grids" div */
        document.getElementById("grids").appendChild(div);
    }
}

function deleteGrid()
{
    /* id of the delete button corresponds to the array row */
    var to_del = this.id;
    var grids = localStorage.getItem("grids");

    grids = JSON.parse(grids);
    grids.splice(to_del, 1);
    localStorage.setItem("grids", JSON.stringify(grids));
    location.reload();
}

function clearLocalStorage()
{
    if (confirm("Voulez-vous vraiment supprimer toutes vos grilles ?")) {
        localStorage.clear();
        location.reload();
    }
}