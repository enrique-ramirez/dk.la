export default function parseVideoURL(url) {
  let type
  let src
  let thumbnail

  url.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(&\S+)?/)

  if (RegExp.$3.indexOf('youtu') > -1) {
    type = 'youtube'
    src = `//www.youtube.com/embed/${RegExp.$6}?rel=0&amp;showinfo=0&amp;autoplay=1`
    thumbnail = `//img.youtube.com/vi/${RegExp.$6}/0.jpg`
  } else if (RegExp.$3.indexOf('vimeo') > -1) {
    type = 'vimeo'
    src = `//player.vimeo.com/video/${RegExp.$6}?autoplay=1&loop=1&autopause=0`
    thumbnail = ''
  }

  return {
    id: RegExp.$6,
    type,
    src,
    thumbnail,
    url,
  }
}
