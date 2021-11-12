function onLoad()
{
    loadNumbers();
    loadGrids();
}

function loadGrids()
{
    var grids = localStorage.getItem("grids");

    if (grids == null ||grids.length <= 0)
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

        /* Add a delete button to delete the grid */
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

function loadNumbers()
{
    var numbers = localStorage.getItem("numbers");

    if (numbers == null || numbers.length <= 0)
        return;
    numbers = JSON.parse(numbers);

    /* Create p in divs for each grid */
    for (var i = 0; i != numbers.length; i++) {
        var div = document.createElement('div');
        var p = document.createElement('p');
        p.className = "number";
        p.appendChild(document.createTextNode(""+numbers[i]));
        div.appendChild(p);

        /* Add a delete button to delete the number */
        var button = document.createElement('button');
        button.className = "delete_button";
        button.type = "button";
        button.id = "" + i;
        button.onclick = deleteNumber;
        div.appendChild(button);

        /* Append child everything to the "numbers" div */
        document.getElementById("numbers").appendChild(div);
    }
}

function deleteGrid()
{
    /* id of the delete button corresponds to the array row */
    var to_del = this.id;
    var grids = localStorage.getItem("grids");
    var gridsid = localStorage.getItem("gridsid");

    grids = JSON.parse(grids);
    gridsid = JSON.parse(gridsid);
    grids.splice(to_del, 1);
    gridsid.splice(to_del, 1);
    localStorage.setItem("grids", JSON.stringify(grids));
    localStorage.setItem("gridsid", JSON.stringify(gridsid));
    location.reload();
}

function deleteNumber()
{
    /* id of the delete button corresponds to the number */
    var to_del = this.id;
    var numbers = localStorage.getItem("numbers");

    numbers = JSON.parse(numbers);
    numbers.splice(to_del, 1);
    localStorage.setItem("numbers", JSON.stringify(numbers));
    location.reload();
}
