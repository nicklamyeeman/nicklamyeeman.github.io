function onLoad()
{
    loadNumbers();
    loadGrids();
    loadCompletedGrids();
    checkGrids();
}

function checkGrids()
{
    var grids = document.getElementById("grids").getElementsByTagName('div');

    for (var g = 0; g != grids.length; g++) {
        var table_id = grids[g].childNodes[1].innerText;
        var table_cells = grids[g].childNodes[0].getElementsByTagName('td');
        var full = true;
        for (tc = 0; tc != table_cells.length; tc++) {
            if (table_cells[tc].innerText != "" && table_cells[tc].className == "white")
                full = false;
        }
        if (full) {
            console.log("GRILLE " + table_id + " TERMINEE !");
        }
    }
}

function loadGrids()
{
    var grids = localStorage.getItem("grids");
    var gridsid = localStorage.getItem("gridsid");

    if (grids == null || grids.length <= 0)
        return;
    if (gridsid == null || gridsid.length <= 0)
        return;
    grids = JSON.parse(grids);
    gridsid = JSON.parse(gridsid);
    
    /* Create table in divs for each grid */
    for (var i = 0; i != grids.length; i++) {
        var div = document.createElement('div');
        div.className = "grid";

        var table = document.createElement('table');
        
        var pid = document.createElement('p');
        pid.appendChild(document.createTextNode(gridsid[i]));

        /* Add rows and cells for the table for each element of the grid */
        for (var j = 0; j != 3; j++) {
            var row = document.createElement('tr');
            for (var k = 0; k != 9; k++) {
                var cell = document.createElement('td');
                cell.appendChild(document.createTextNode(grids[i][j][k]));
                if (matchNumber(grids[i][j][k]))
                    cell.className = "green";
                else
                    cell.className = "white";
                row.appendChild(cell);
            }
            table.appendChild(row);
        }
        div.appendChild(table);
        div.appendChild(pid);

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

function loadCompletedGrids()
{
    var completed_grids = localStorage.getItem("completed_grids");
    var completed_gridsid = localStorage.getItem("completed_gridsid");

    if (completed_grids == null || completed_grids.length <= 0)
        return;
    if (completed_gridsid == null || completed_gridsid.length <= 0)
        return;
    completed_grids = JSON.parse(completed_grids);
    completed_gridsid = JSON.parse(completed_gridsid);
    
    /* Create table in divs for each grid */
    for (var i = 0; i != completed_grids.length; i++) {
        var div = document.createElement('div');
        div.className = "grid";

        var table = document.createElement('table');
        
        var pid = document.createElement('p');
        pid.appendChild(document.createTextNode(completed_gridsid[i]));

        /* Add rows and cells for the table for each element of the grid */
        for (var j = 0; j != 3; j++) {
            var row = document.createElement('tr');
            for (var k = 0; k != 9; k++) {
                var cell = document.createElement('td');
                cell.appendChild(document.createTextNode(completed_grids[i][j][k]));
                if (matchNumber(completed_grids[i][j][k]))
                    cell.className = "green";
                else
                    cell.className = "white";
                row.appendChild(cell);
            }
            table.appendChild(row);
        }
        div.appendChild(table);
        div.appendChild(pid);

        /* Add a delete button to delete the grid */
        var button = document.createElement('button');
        button.className = "delete_button";
        button.type = "button";
        button.id = "" + i;
        button.onclick = deleteGrid;
        div.appendChild(button);

        /* Append child everything to the "completed_grids" div */
        document.getElementById("completed_grids").appendChild(div);
    }
}

function matchNumber(cell_value)
{
    var numbers = localStorage.getItem("numbers");

    if (numbers == null || numbers.lenght <= 0)
        return false;
    numbers = JSON.parse(numbers);

    for (var n = 0; n != numbers.length; n++)
        if (numbers[n] == cell_value)
            return true;
    return false;
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
        div.className = "number";

        var p = document.createElement('p');
        p.appendChild(document.createTextNode(numbers[i]));
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
