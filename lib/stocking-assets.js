const base = '/stocking-assets';
export const stockingAssets = [
  ['stockings/stocking_red_snowflake.png', 'stockings/stocking_green_tartan_tree.png', 'stockings/stocking_cream_hearts.png', 'stockings/stocking_blue_snowman.png'],
  ['loops/loop_lace_bow.png', 'loops/loop_green_stitch.png', 'loops/loop_candycane_twist.png', 'loops/loop_gold_braid_bell.png'],
  ['ribbons/ribbon_red_velvet.png', 'ribbons/ribbon_ivory_star.png', 'ribbons/ribbon_green_tartan.png', 'ribbons/ribbon_candycane_holly.png'],
  ['bells/bell_green_holly.png', 'bells/bell_silver_snowflake.png', 'bells/bell_gold_star.png', 'bells/bell_red_reindeer.png'],
].map(group => group.map(path => `${base}/${path}`));
