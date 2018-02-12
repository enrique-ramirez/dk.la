<?php
  add_theme_support('post-thumbnails');
  show_admin_bar( false );

  remove_action('wp_head', 'print_emoji_detection_script', 7);
  remove_action('wp_print_styles', 'print_emoji_styles');

  remove_action('admin_print_scripts', 'print_emoji_detection_script');
  remove_action('admin_print_styles', 'print_emoji_styles');

  function remove_scripts() {
     wp_deregister_script('jquery');
     wp_deregister_script('wp-embed');
  }

  if (!is_admin()) add_action('wp_enqueue_scripts', 'remove_scripts');
?>
