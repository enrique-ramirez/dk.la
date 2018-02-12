<?php
/**
 * @package WordPress
 * @subpackage dkla
 * @since 1.0
 * @version 1.0
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
  <head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width,initial-scale=1"/>
    <script>window.WPApiUrl="<?php echo get_rest_url(null, 'wp/v2') ?>"</script>
    <?php wp_head(); ?>
  </head>
  <body>
    <div id="root"></div>
    <?php wp_footer(); ?>
  <script type="text/javascript" src="<?php echo get_template_directory_uri() ?>/assets/vendor.js"></script><script type="text/javascript" src="<?php echo get_template_directory_uri() ?>/assets/main.js"></script></body>
</html>
