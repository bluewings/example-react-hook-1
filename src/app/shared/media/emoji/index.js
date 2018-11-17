import entries from 'object.entries';
import babyChick from './baby-chick.png';
import bear from './bear.png';
import bird from './bird.png';
import cat from './cat.png';
import chicken from './chicken.png';
import cow from './cow.png';
import dog from './dog.png';
import fox from './fox.png';
import hamster from './hamster.png';
import horse from './horse.png';
import koala from './koala.png';
import lion from './lion.png';
import monkey from './monkey.png';
import mouse from './mouse.png';
import panda from './panda.png';
import penguin from './penguin.png';
import pig from './pig.png';
import rabbit from './rabbit.png';
import tiger from './tiger.png';
import unicorn from './unicorn.png';

const emoji = entries({
  babyChick,
  bear,
  bird,
  cat,
  chicken,
  cow,
  dog,
  fox,
  hamster,
  horse,
  koala,
  lion,
  monkey,
  mouse,
  panda,
  penguin,
  pig,
  rabbit,
  tiger,
  unicorn,
}).map(([name, img]) => {
  return {
    name,
    img
  }
});

export default emoji;