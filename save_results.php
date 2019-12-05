<?php
    $db = new mysqli('localhost','antoineconqui','admin','ihm');
    $db->set_charset('utf8');

    $prenom = htmlspecialchars($_POST['prenom']);
    $nom = htmlspecialchars($_POST['nom']);
    $avions = htmlspecialchars($_POST['avions']);
    $avionsTotal = htmlspecialchars($_POST['avionsTotal']);
    $calculs = htmlspecialchars($_POST['calculs']);
    $calculsTotal = htmlspecialchars($_POST['calculsTotal']);
    $time1 = htmlspecialchars($_POST['time1']);
    $time2 = htmlspecialchars($_POST['time2']);
    $time3 = htmlspecialchars($_POST['time3']);
    $time4 = htmlspecialchars($_POST['time4']);
    $time5 = htmlspecialchars($_POST['time5']);
    $time6 = htmlspecialchars($_POST['time6']);
    $time7 = htmlspecialchars($_POST['time7']);
    $time8 = htmlspecialchars($_POST['time8']);

    $db->query("INSERT INTO results (prenom, nom, avions, avionsTotal, calculs, calculsTotal, time1, time2, time3, time4, time5, time6, time7, time8) VALUES ('".$prenom."','".$nom."',".$avions.",".$avionsTotal.",".$calculs.",".$calculsTotal.",".$time1.",".$time2.",".$time3.",".$time4.",".$time5.",".$time6.",".$time7.",".$time8.")");
?>