<?php
	include'config.php';

	$sql = "SELECT * FROM contact_messages";
	$result = $conn->query($sql);

	echo "<h2>Listes des Utilisateurs</h2>";
	echo"<table border='1'>
		<tr>
			<th>name</th>
			<th>email</th>
			<th>subject</th>
			<th>message</th>
			<th>Action</th>
		</tr>";
		
	while ($row=$result->fetch_assoc()) {
			 	echo"<tr>
			 			<td>{$row['name']}</td>
			 			<td>{$row['email']}</td>
			 			<td>{$row['subject']}</td>
			 			<td>{$row['message']}</td>
			 			<td>
                    		<a href='update.php?id=" . $row['id'] . "'>Modifier</a> | 
                    		<a href='delete.php?id=" . $row['id'] . "'>Supprimer</a>
                		</td>
                	</tr>";	
			 }	

			 echo"</table>";	 
?>