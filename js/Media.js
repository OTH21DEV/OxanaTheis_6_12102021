//Import de fichier Photo.js, Video.js
import{Photo} from "/js/Photo.js";
import{Video} from "/js/Video.js";

//Export vers le fichier photographe.js
export { Media };




//Factory pattern
//Factory Media recupere les données qui lui sont passées et delegue la creation et le formatage de ces données au bon Constructor
//Permet de gerer differentes sources de données

class Media {
  constructor(media, photographe) {
    //on retourne le Constructeur Photo ou Video
    if (media.image) {
      return new Photo(photographe.path, media.image);
    } else if (media.video) {
      return new Video(photographe.path, media.video);
    }
  }
}

