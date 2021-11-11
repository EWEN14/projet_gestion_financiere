<?php

function init_session(): bool {
  if (!session_id())
  {
    session_start();
    session_regenerate_id();
    return true;
  }
  return false;
}

function clean_session(): void {
  session_unset();
  session_destroy();
}

function is_admin() : bool{
  $logged;
  if (isset($_SESSION['rank']) && isset($_SESSION['username']) && !empty($_SESSION['username'] && $_SESSION['rank'] == '1')) {
    $logged = true;
  }else {
    $logged = false;
  }
  return $logged;
}

function is_logged(): bool {
  $logged;
  if (isset($_SESSION['rank']) && isset($_SESSION['username']) && !empty($_SESSION['rank']) && !empty($_SESSION['username'])) {
    $logged = true;
  }else {
    $logged = false;
  }
  return $logged;
}

function dateDuJour():String {
  $date = getdate();
  if ($date['mday'] < 10) {
    $date = $date['year'].'-'.$date['mon'].'-0'.$date['mday'];
  }else {
    $date = $date['year'].'-'.$date['mon'].'-'.$date['mday'];
  }
  return $date;
}
