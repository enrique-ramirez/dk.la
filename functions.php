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
  }

  add_action('init', 'register_menus');

  // ACF fields
  if( function_exists('acf_add_local_field_group') ):

  acf_add_local_field_group(array(
    'key' => 'group_5a9604a664b6a',
    'title' => 'Animated thumbnail',
    'fields' => array(
      array(
        'key' => 'field_5a94de898b957',
        'label' => 'Thumbnail webm',
        'name' => 'thumbnail_webm',
        'type' => 'file',
        'instructions' => 'Webm to reproduce on :hover of thumbnail. Video should be 1:1 aspect ratio (squared). As a suggestion, the first frame should be the same as your featured image.',
        'required' => 0,
        'conditional_logic' => 0,
        'wrapper' => array(
          'width' => '',
          'class' => '',
          'id' => '',
        ),
        'return_format' => 'url',
        'library' => 'all',
        'min_size' => '',
        'max_size' => '',
        'mime_types' => '',
      ),
      array(
        'key' => 'field_5a94deed8b958',
        'label' => 'Thumbnail mp4',
        'name' => 'thumbnail_mp4',
        'type' => 'file',
        'instructions' => 'For browsers that do not support webm, this file will be used to reproduce on :hover of thumbnail. Video should be 1:1 aspect ratio (squared). This file should be the same as the webm, just in mp4 format.',
        'required' => 0,
        'conditional_logic' => 0,
        'wrapper' => array(
          'width' => '',
          'class' => '',
          'id' => '',
        ),
        'return_format' => 'url',
        'library' => 'all',
        'min_size' => '',
        'max_size' => '',
        'mime_types' => '',
      ),
    ),
    'location' => array(
      array(
        array(
          'param' => 'post_type',
          'operator' => '==',
          'value' => 'project',
        ),
      ),
    ),
    'menu_order' => 0,
    'position' => 'side',
    'style' => 'default',
    'label_placement' => 'top',
    'instruction_placement' => 'label',
    'hide_on_screen' => '',
    'active' => 1,
    'description' => '',
  ));

  acf_add_local_field_group(array(
    'key' => 'group_5a9604a66b2c7',
    'title' => 'Page fields',
    'fields' => array(
      array(
        'key' => 'field_5a81ea4c97959',
        'label' => 'SEO Title',
        'name' => 'seo_title',
        'type' => 'text',
        'instructions' => 'A title tag is an HTML element that specifies the title of a web page. Title tags are displayed on search engine results pages (SERPs) as the clickable headline for a given result, and are important for usability, SEO, and social sharing. The title tag of a web page is meant to be an accurate and concise description of a page\'s content.',
        'required' => 1,
        'conditional_logic' => 0,
        'wrapper' => array(
          'width' => '',
          'class' => '',
          'id' => '',
        ),
        'default_value' => '',
        'placeholder' => '',
        'prepend' => '',
        'append' => '',
        'formatting' => 'none',
        'maxlength' => 60,
      ),
      array(
        'key' => 'field_5a81ead99795a',
        'label' => 'SEO Description',
        'name' => 'seo_description',
        'type' => 'text',
        'instructions' => 'Robots.txt
  Robots Meta Directives
  Schema.org Structured Data
  HTTP Status Codes
  Page Speed
  Conversion Rate Optimization
  Domains
  URLs
  Canonicalization
  Redirection
  Related Resources
  The Moz Blog
  Q&A Forum
  Workshops and Training
  Help Hub
  Free SEO Tools
  Google Algorithm Change History
  Beginner\'s Guide to SEO
  SEO Learning Center On-Site SEO Meta Description
  Meta Description
  What is a meta description?
  Meta descriptions are HTML attributes that provide concise summaries of webpages. They are between one sentence to a short paragraph and appear underneath the blue clickable links in a search engine results page (SERP). However, depending on a user\'s query, Google might pull meta description text from other areas on your page (in an attempt to better answer the searcher\'s query).',
        'required' => 1,
        'conditional_logic' => 0,
        'wrapper' => array(
          'width' => '',
          'class' => '',
          'id' => '',
        ),
        'default_value' => '',
        'placeholder' => '',
        'prepend' => '',
        'append' => '',
        'formatting' => 'html',
        'maxlength' => 300,
      ),
    ),
    'location' => array(
      array(
        array(
          'param' => 'post_type',
          'operator' => '==',
          'value' => 'page',
        ),
      ),
    ),
    'menu_order' => 0,
    'position' => 'acf_after_title',
    'style' => 'default',
    'label_placement' => 'top',
    'instruction_placement' => 'label',
    'hide_on_screen' => array(
    ),
    'active' => 1,
    'description' => '',
  ));

  acf_add_local_field_group(array(
    'key' => 'group_5a96057815c5b',
    'title' => 'Project gallery',
    'fields' => array(
      array(
        'key' => 'field_5a96057c4304f',
        'label' => 'gallery',
        'name' => 'gallery',
        'type' => 'gallery',
        'instructions' => 'Gallery to display on this post.',
        'required' => 0,
        'conditional_logic' => 0,
        'wrapper' => array(
          'width' => '',
          'class' => '',
          'id' => '',
        ),
        'min' => '',
        'max' => '',
        'insert' => 'append',
        'library' => 'uploadedTo',
        'min_width' => '',
        'min_height' => '',
        'min_size' => '',
        'max_width' => '',
        'max_height' => '',
        'max_size' => '',
        'mime_types' => '',
      ),
    ),
    'location' => array(
      array(
        array(
          'param' => 'post_category',
          'operator' => '==',
          'value' => 'category:photo',
        ),
      ),
    ),
    'menu_order' => 0,
    'position' => 'acf_after_title',
    'style' => 'default',
    'label_placement' => 'top',
    'instruction_placement' => 'label',
    'hide_on_screen' => '',
    'active' => 1,
    'description' => '',
  ));

  acf_add_local_field_group(array(
    'key' => 'group_5a9604a67055e',
    'title' => 'Splash page fields',
    'fields' => array(
      array(
        'key' => 'field_5a8117e0ba87e',
        'label' => 'Featured Video (webm)',
        'name' => 'featured_video_webm',
        'type' => 'file',
        'instructions' => 'Video to display at the background, in webm format.',
        'required' => 1,
        'conditional_logic' => 0,
        'wrapper' => array(
          'width' => '',
          'class' => '',
          'id' => '',
        ),
        'library' => 'uploadedTo',
        'return_format' => 'url',
        'min_size' => 0,
        'max_size' => 0,
        'mime_types' => '',
      ),
      array(
        'key' => 'field_5a813ecd18f23',
        'label' => 'Featured video (mp4)',
        'name' => 'featured_video_mp4',
        'type' => 'file',
        'instructions' => 'Video to display at the background, in mp4 format.',
        'required' => 1,
        'conditional_logic' => 0,
        'wrapper' => array(
          'width' => '',
          'class' => '',
          'id' => '',
        ),
        'library' => 'all',
        'return_format' => 'url',
        'min_size' => 0,
        'max_size' => 0,
        'mime_types' => '',
      ),
    ),
    'location' => array(
      array(
        array(
          'param' => 'page_type',
          'operator' => '==',
          'value' => 'front_page',
        ),
      ),
    ),
    'menu_order' => 0,
    'position' => 'side',
    'style' => 'default',
    'label_placement' => 'top',
    'instruction_placement' => 'label',
    'hide_on_screen' => array(
    ),
    'active' => 1,
    'description' => '',
  ));

  acf_add_local_field_group(array(
    'key' => 'group_5a99e0e290932',
    'title' => 'Video post fields',
    'fields' => array(
      array(
        'key' => 'field_5a99e1911d7cb',
        'label' => 'Video link',
        'name' => 'video_link',
        'type' => 'url',
        'instructions' => 'Video url (vimeo).',
        'required' => 1,
        'conditional_logic' => 0,
        'wrapper' => array(
          'width' => '',
          'class' => '',
          'id' => '',
        ),
        'default_value' => '',
        'placeholder' => '',
      ),
      array(
        'key' => 'field_5a99e0eb78cd6',
        'label' => 'Photo stills post',
        'name' => 'photo_stills_post',
        'type' => 'post_object',
        'instructions' => 'Link to the photo stills of this project',
        'required' => 0,
        'conditional_logic' => 0,
        'wrapper' => array(
          'width' => '',
          'class' => '',
          'id' => '',
        ),
        'post_type' => array(
          0 => 'project',
        ),
        'taxonomy' => array(
          0 => 'category:photo',
        ),
        'allow_null' => 0,
        'multiple' => 0,
        'return_format' => 'object',
        'ui' => 1,
      ),
    ),
    'location' => array(
      array(
        array(
          'param' => 'post_category',
          'operator' => '==',
          'value' => 'category:video',
        ),
      ),
    ),
    'menu_order' => 0,
    'position' => 'acf_after_title',
    'style' => 'default',
    'label_placement' => 'top',
    'instruction_placement' => 'label',
    'hide_on_screen' => '',
    'active' => 1,
    'description' => '',
  ));

  endif;
?>
