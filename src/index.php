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
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script>
      window.DEVELOPMENT_API_URL = '<?php echo get_rest_url(null) ?>';
      window.BASE_URL = '<?php echo get_site_url() ?>';
    </script>
    <?php wp_head(); ?>
  </head>
  <body>
    <div id="root"></div>
    <?php wp_footer(); ?>
  </body>
</html>
