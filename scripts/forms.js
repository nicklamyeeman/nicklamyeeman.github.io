function validateForm()
{
    var new_number = document.forms["add_number"]["number"].value;
    
    /* Check validity of the gotten number */
    if (!validateNumber(new_number))
        return false;

    /* Store new number in local storage */
    pushNumberLocalStorage(new_number);
}

function validateNumber(new_number)
{
    var numbers = localStorage.getItem("numbers");

    if (new_number == null || new_number == "") {
        alert("Le numéro tiré doit être entre 1 et 90 !");
        return false;
    }
    if (numbers != null && numbers.length > 0) {
        numbers = JSON.parse(numbers);
        for (var n = 0; n != numbers.length; n++) {
            if (numbers[n] == new_number) {
                alert("Le numéro a déjà été tiré !");
                return false;
            }
        }
    }
    return true;
}

function pushNumberLocalStorage(new_number)
{
    var numbers = localStorage.getItem("numbers");

    if (numbers == null || numbers.length == 0)
        numbers = [new_number];
    else {
        numbers = JSON.parse(numbers);
        numbers[numbers.length] = new_number;
    }
    localStorage.setItem("numbers", JSON.stringify(numbers));
}

function validateGrid()
{
    /* Create new grid from the form */
    var new_grid = [[], [], []];
    var inputs = ["num1", "num2", "num3", "num4", "num5", "num6", "num7", "num8", "num9",
    "num10", "num11", "num12", "num13", "num14", "num15", "num16", "num17", "num18",
    "num19", "num20", "num21", "num22", "num23", "num24", "num25", "num26", "num27"];
    var grid_id = document.forms["add_grid"]["grid_id"].value;
    
    for (var i = 0, it = 0; i != 3; i++) {
        for (var j = 0; j != 9; it++, j++)
            new_grid[i][j] = document.forms["add_grid"][inputs[it]].value;
    }
    
    /* Check validity of the new grid id */
    var gridsid = validateGridsID(grid_id);
    if (gridsid == null)
        return false;
    
    /* Check validity of the new grid content */
    if (!validateGrids(new_grid))
        return false;

    /* Store new grid and grid id in local storage */
    pushGridLocalStorage(new_grid, gridsid)
}

function validateGridsID(grid_id)
{ 
    if (grid_id == "") {
        alert("Veuillez renseigner le numéro de votre grille situé en bas à gauche.");
        return null;
    }
    
    var gridsid = localStorage.getItem("gridsid");
    
    if (gridsid == null || gridsid.length == 0)
        gridsid = [grid_id];
    else {
        gridsid = JSON.parse(gridsid);
        for (var g = 0; g != gridsid.length; g++) {
            console.log(grid_id);
            if (gridsid[g] == grid_id) {
                alert("Le numéro de grille est incorrect.\nCe numéro a déjà été utilisé !");
                return null;
            }
        }
        gridsid[gridsid.length] = grid_id;
    }
    return gridsid;
}

function validateGrids(new_grid)
{
    var values = [];
    var mod = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    
    for (var i = 0; i != 3; i++) {
        for (var j = 0; j != 9; j++) {
            if (new_grid[i][j] != "") {
                values.push(new_grid[i][j]);
                console.log(Math.floor(new_grid[i][j] / 10));
                if (new_grid[i][j] >= 80) {
                    mod[8] = -1;
                    mod[9] = -1;
                } else
                    mod[Math.floor(new_grid[i][j] / 10)] = -1;
            }
        }
    }
    if (values.length == 15) {
        values.sort();
        for (var v = 0; v != values.length; v++) {
            if ((v + 1 <= values.length) && (values[v + 1] == values[v])) {
                alert("La grille n'est pas correcte.\nIl doit y avoir 15 numéros différents !");
                return false;
            }
        }
        for (var m = 0; m != mod.length; m++) {
            if (mod[m] != -1) {
                alert("La grille n'est pas correcte.\nElle doit contenir au minimum un numéro dans chaque colonne !");
                return false;
            }
        }
    } else {
        alert("La grille n'est pas correcte.\nIl doit y avoir 15 numéros valides !");
        return false;
    }
    return true;
}

function pushGridLocalStorage(new_grid, gridsid)
{
    var grids = localStorage.getItem("grids");
    
    if (grids == null || grids.length == 0)
        grids = [new_grid];
    else {
        grids = JSON.parse(grids);
        grids[grids.length] = new_grid;
    }
    localStorage.setItem("grids", JSON.stringify(grids));
    localStorage.setItem("gridsid", JSON.stringify(gridsid));
}