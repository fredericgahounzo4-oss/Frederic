<?php  
  include 'config.php';

  if (isset($_POST['submit'])) {
      $name    =  $_POST['name'];
      $email   =  $_POST['email'];
      $subject =  $_POST['subject'];
      $message =  $_POST['message'];

      $sql= "INSERT INTO contact_messages(name, email, subject, message) VALUES ('$name', '$email', '$subject', '$message')";

      if ($conn->query($sql)) {
          echo"✅ Votre message a été envoyé avec succès";    
      } else {
          echo"Erreur de connexion" . $conn->error;
      } 

  }

?>



