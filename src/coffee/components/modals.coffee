###
 * Requires jquery.magnific-popup.js
###
$ ->
  # single image
  $(
    ".modal.image, 
     .modal[href*='.jpg'], 
     .modal[href*='.jpeg'], 
     .modal[href*='.gif'], 
     .modal[href*='.png']"
    ).magnificPopup(
      type: 'image'
    )
  
  # image gallery
  $(".modal.gallery").magnificPopup(
    delegate: 'a'
    type: 'image'
    image: 
      titleSrc: 'title'
    gallery: 
      enabled: true
  )

  # inline content
  $(".modal[href^='#']").magnificPopup(
      type: 'inline'
      mainClass: 'inline-modal'
  )

  # external content
  $("a.modal[href^='http']").not(".image").not("[href*='.jpg']").not("[href*='.jpeg']").not("[href*='.gif']").not("[href*='.png']").magnificPopup(
    type: 'iframe'
    height: '100%'
  )

  # video content
  $("a.video.modal[href^='http']").magnificPopup(
    type: 'iframe'
  )

  # ajax content
  $("a.modal[href]").not("[href^='#']").not(".image").not("[href^='http']").not("[href*='.jpg']").not("[href*='.jpeg']").not("[href*='.gif']").not("[href*='.png']").magnificPopup(
    type: 'ajax'
  )
