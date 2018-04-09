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

  // Thumbnail sizes
  add_theme_support('post-thumbnails');
  add_image_size('grid-thumb', 400, 400, true);

  // Register post types
  function create_post_types() {
    register_post_type( 'project',
      array(
        'labels' => array(
          'name' => __('Projects'),
          'singular_name' => __('Project')
        ),
        'public' => true,
        'show_in_rest' => true,
        'has_archive' => true,
        'taxonomies' => array('category'),
        'supports' => array(
          'title',
          'editor',
          'author',
          'thumbnail',
          'comments',
        )
      )
    );
  }

  add_action('init', 'create_post_types');

  // Remove Add Media Button for custom post type
  function remove_media_button() {
    global $current_screen;

    if ('project' == $current_screen -> post_type) remove_action('media_buttons', 'media_buttons');
  }
  add_action('admin_head','remove_media_button');

  // Register menus
  function register_menus() {
    register_nav_menu('header-menu',__('Header Menu'));
    register_nav_menu('footer-menu',__('Footer Menu'));
  }

  add_action('init', 'register_menus');
?>
