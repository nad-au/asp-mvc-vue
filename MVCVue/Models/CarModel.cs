using System.ComponentModel;

namespace MVCVue.Models
{
    public class CarModel
    {
        [DisplayName("Brand")]
        public long BrandId { get; set; }

        [DisplayName("Model")]
        public long ModelId { get; set; }
    }
}
