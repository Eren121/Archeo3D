function loadEventsModule() {

  ChargeObjJovin.prototype.createAnimation = function() {

    let objJovin = this;
    let animRange = $('#animSeek');
    let target = this.pivot; // Jovin
    let animeProperties = {
      targets: target.rotation,
      duration: 3000,
      easing: 'linear',
      loop: true,
      autoplay: false,
      targets: target.position,
      update: function() {

          animRange.val(this.progress);
      }
    };

    let unit = 100;
    let animeObj = anime.timeline(animeProperties)
      .add({
        x: '+=' + unit
      })
      .add({
        z: '+=' + unit
      })
      .add({
        x: '-=' + unit
      })
      .add({
        z: '-=' + unit
      }).add({
        targets: target.rotation,
        x: 10
      });

    let completedLoading = function() {
      //objJovin.startingTime = performance.now();
      console.log("Start animation");
      animeObj.play();
      this.isPaused = false;
    }

    this.startingTime = -1; // pas encore lancé
    this.autoMove = false;
    this.wwObjLoader2.registerCallbackCompletedLoading(completedLoading);
    this.anime = animeObj;
    this.isPaused = true;

    /*
    this.updateAnimation = function() {
      if(this.startingTime > -1) {
        let time = performance.now() - this.startingTime;
        this.anime.tick(time);
      }
    };

    // actualiser l'animation dans render
    this.cachedRender = this.render;
    this.render = function() {
      this.updateAnimation();
      this.cachedRender();
    }
    */

    var size = 1000;
    var divisions = 10;

    var gridHelper = new THREE.GridHelper( size, divisions );
    this.scene.add( gridHelper );

    $('#animPause').click(function() {

      this.isPaused = !this.isPaused;
      if(this.isPaused) {
        animeObj.pause();
      }
      else {
        animeObj.play();
      }
    });

    $('#animRestart').click(function() {

      animeObj.restart();
    });

    animRange.on('input', function() {

      let time = parseInt($(this).val()) / 100.0 * animeObj.duration;

      if(!this.isPaused) { // nécessaire, sinon le slider et l'animation ne peuvent pas être changés en non pause
        animeObj.pause();
        animeObj.seek(time);
        animeObj.play();
      }
      else {
        animeObj.seek(time);
      }
    });
  }
}
