import entries from 'object.entries';
import babyChick from 'media/baby-chick.png';
import bear from 'media/bear.png';
import bird from 'media/bird.png';
import cat from 'media/cat.png';
import chicken from 'media/chicken.png';
import cow from 'media/cow.png';
import dog from 'media/dog.png';
import fox from 'media/fox.png';
import hamster from 'media/hamster.png';
import horse from 'media/horse.png';
import koala from 'media/koala.png';
import lion from 'media/lion.png';
import monkey from 'media/monkey.png';
import mouse from 'media/mouse.png';
import panda from 'media/panda.png';
import penguin from 'media/penguin.png';
import pig from 'media/pig.png';
import rabbit from 'media/rabbit.png';
import tiger from 'media/tiger.png';
import unicorn from 'media/unicorn.png';

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