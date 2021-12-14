function clearNumbersStorage()
{
    if (confirm("Voulez-vous vraiment supprimer tous les numéros tirés ?")) {
        localStorage.removeItem("numbers");
        location.reload();
    }
}

function clearGridsStorage()
{
    if (confirm("Voulez-vous vraiment supprimer toutes vos grilles ?")) {
        localStorage.removeItem("grids");
        localStorage.removeItem("gridsid");
        location.reload();
    }
}