<?php
    $db = new mysqli('localhost','antoineconqui','admin','ihm');
    $db->set_charset('utf8');

    $results = $db->query("SELECT *, calculsTotal*(calculs/calculsTotal+avions/avionsTotal) as score FROM results ORDER BY score DESC");
?>

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
</head>

<body>

    <div class="container">
        <div class="row">
            <h1>Pilot Tester Platform</h1>
        </div>
        <div class="row">
            <table>
                <thead>
                    <tr>
                        <th>Prénom</th>
                        <th>Nom</th>
                        <th>Score</th>
                        <th>% Avions</th>
                        <th>Nb Calculs</th>
                        <th>% Calculs</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                        while($result = $results -> fetch_assoc()){
                            print('<tr>');
                            print('<td>'.$result['prenom'].'</td>');
                            print('<td>'.$result['nom'].'</td>');
                            print('<td class="score">'.round($result['score']).'</td>');
                            print('<td>'.round($result['avions']/$result['avionsTotal']*100).'</td>');
                            print('<td>'.$result['calculsTotal'].'</td>');
                            print('<td>'.round($result['calculs']/$result['calculsTotal']*100).'</td>');
                            print('</tr>');
                        }
                    ?>
                </tbody>
            </table>
        </div>

        <div class="row backFrame">
            <a href="index.html"><button class="backButton">Accueil</button></a>
        </div>
    </div>

</body>

</html>