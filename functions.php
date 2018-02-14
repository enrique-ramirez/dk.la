<?php
  // Add thumbnails support
  add_theme_support('post-thumbnails');

  // Remove admin bar
  show_admin_bar( false );

  // Remove emoji scripts
  remove_action('wp_head', 'print_emoji_detection_script', 7);
  remove_action('wp_print_styles', 'print_emoji_styles');
  remove_action('admin_print_scripts', 'print_emoji_detection_script');
  remove_action('admin_print_styles', 'print_emoji_styles');

  // Remove custom JS
  function remove_scripts() {
     wp_deregister_script('jquery');
     wp_deregister_script('wp-embed');
  }

  if (!is_admin()) add_action('wp_enqueue_scripts', 'remove_scripts');

  // Register post types
  function create_post_types() {
    register_post_type( 'dk_project',
      array(
        'labels' => array(
          'name' => __('Projects'),
          'singular_name' => __('Project')
        ),
        'public' => true,
        'has_archive' => true,
      )
    );
  }
  add_action('init', 'create_post_types');
?>
