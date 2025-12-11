<?php
include 'config.php';

/* Récupération de l'utilisateur via son ID */
$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
$sql = "SELECT * FROM contact_messages WHERE id = $id";
$result = $conn->query($sql);
$row = $result->fetch_assoc();

if (!$row) {
    die("❌ Utilisateur non trouvé pour ID $id");
}

/* Si formulaire soumis */
if (isset($_POST['delete'])) {
    $name   = $_POST['name'];
    $email = $_POST['email'];
    $subject   = $_POST['subject'];
    $message = $_POST['message'];

    /* Supprimer */
    $stmt = $conn->prepare("DELETE FROM contact_messages WHERE id=$id");

    if ($stmt->execute()) {
        echo "✅ Suppression réussir<br>";
        

        // Si tu veux retourner sur read.php :
        header("Location: read.php");
        exit;
    } else {
        echo "❌ Erreur de Suppression : " . $conn->error;
    }
}
?>

<form method="POST">
    name : <input type="name" name="name" value="<?=($row['name']) ?>"><br><br>
    email : <input type="email" name="email" value="<?=($row['email']) ?>"><br>
    subject : <input type="subject" name="subject" value="<?=($row['subject']) ?>"><br><br>
    message : <input type="message" name="message" value="<?=($row['message']) ?>"><br>
    <button type="submit" name="delete">Supprimer</button>
</form>