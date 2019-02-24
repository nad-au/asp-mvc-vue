using System.ComponentModel;

namespace MVCVue.Models
{
    public static class CarModels
    {
        public const long BMW = 1;
        public const long Cadillac = 2;
        public const long Kia = 3;
        public const long Volkswagen = 4;
    }

    public class CarModel
    {
        [DisplayName("Brand")]
        public long BrandId { get; set; }

        [DisplayName("Model")]
        public long ModelId { get; set; }
    }
}
