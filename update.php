<?php
include'config.php';

$id = isset($_GET['id']) ? (int) $_GET['id'] : 0;
$sql = "SELECT * FROM contact_messages WHERE id=$id";
$result = $conn->query($sql);
$row = $result->fetch_assoc();

if (!$row) {
    die("❌ Utilisateur non trouvé pour ID $id");
}

/* Si formulaire soumis */
if (isset($_POST['update'])) {
    $name    = $_POST['name'];
    $email   = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    /* Mise à jour */
    $stmt = $conn->prepare("UPDATE contact_messages SET name=?, email=?, subject=?, message=? WHERE id=?");
    if (!$stmt) {
        die("❌ Erreur préparation : " . $conn->error);
    }

    // 4 strings + 1 int
    $stmt->bind_param("ssssi", $name, $email, $subject, $message, $id);

    if ($stmt->execute()) {
        echo "✅ Modification réussie<br>";

        // Redirection
        header("Location: read.php");
        exit;
    } else {
        echo "❌ Erreur de modification : " . $stmt->error;
    }

    $stmt->close();
}

?>


<form method="POST">
    name : <input type="name" name="name" value="<?=($row['name']) ?>"><br><br>
    email : <input type="email" name="email" value="<?=($row['email']) ?>"><br><br>
    subject : <input type="subject" name="subject" value="<?=($row['subject']) ?>"><br><br>
    message : <input type="message" name="message" value="<?=($row['message']) ?>"><br>
    <button type="submit" name="update">Modifier</button>
</form>