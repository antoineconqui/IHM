<?php
  $prenom = htmlspecialchars($_POST['prenom']);
  $nom  = htmlspecialchars($_POST['nom']);
?><script>
    var prenom = '<?php print $prenom; ?>';
    var nom = '<?php print $nom; ?>';
</script>

<!DOCTYPE html>
<html lang="fr">

<head>
    <title>Pilot Tester Platform</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
</head>

<body>

    <div class="case" id="caseAlarme">
        <span class="alarme"></span>
    </div>

    <div class="case" id="caseInfos">
        <div class='infos'>
            <?php echo  $prenom, ' ', $nom; ?>
            <br><br>
            <span id="nbAvions"></span>
            <span id="nbCalculs"></span>
        </div>
    </div>

    <div class="case" id="caseAvion">
        <img src="./avion.png" alt="avion" class="avion" id="avion">
        <img src="./piste.png" alt="piste" id="piste">
    </div>

    <div class="case" id="caseMental">
        <button class="btn btn-danger" id="mentalFalse">FAUX<br>(F)</button>
        <span>
            <span id="calcul"></span>
            <span id="suggestion"></span>
        </span>
        <button class="btn btn-success" id="mentalTrue">VRAI<br>(V)</button>
        </span>
    </div>

    <script src="script.js"></script>

</body>

</html>