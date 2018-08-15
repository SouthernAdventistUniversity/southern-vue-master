<script>
export default {
  name: "LibraryCollections",
  props: {
    collectionsName: String,
    collectionsUrl: String,
    collectionsImage: String
  },
  data: function () {
    return {
      mCollectionsName: this.collectionsName,
      mCollectionsUrl: this.collectionsUrl,
      mCollectionsImage: this.collectionsImage
    };
  },
  methods: {
    collectionsSet: function (id, url, image) {
      this.mCollectionsName = id;
      this.mCollectionsUrl = url;
      this.mCollectionsImage = image;

      document.getElementsByClassName('collections-content-container')[0].scrollTop = 0;
    }
  }
};
</script>

<style scoped>
</style>