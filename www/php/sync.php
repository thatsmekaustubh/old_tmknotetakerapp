<?php
  $file="bkup.json";
  if(isset($_POST['data'])){
      file_put_contents($file,$_POST['data']);
      echo "data collecting from JQuery";
  } if(isset($_POST['token'])){
      echo "deu ka?";
  } else {
      echo "<h1>Data collecting from file </h1>";
      $fileContent = file_get_contents($file);
      $content=json_decode($fileContent,true);
      var_dump($content);
      echo "<hr/>";
      echo "<h1>Printing table</h1>";
      echo "<table border='1'>";
        echo "<tr>  <th>        Id    </th> <th>        Title        </th>  <th>         Content       </th>  <th>Category ID</th>  </tr>";
      foreach ($content as $key => $row) {
        echo "<tr>  <td>".$row['id']."</td> <td>".$row['notetitle']."</td>  <td>".$row['notecontent']."</td>  <td>".$row['category']."</td>  </tr>";
      }
      echo "</table>";
  }
?>