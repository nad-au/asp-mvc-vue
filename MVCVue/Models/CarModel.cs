using System.ComponentModel;

namespace MVCVue.Models
{
    public static class CarBrands
    {
        public const long BMW = 1;
        public const long Cadillac = 2;
        public const long Kia = 3;
        public const long Volkswagen = 4;
    }

    public static class CarModels
    {
        public const long BMW5Series = 8;
        public const long CadilacCoupeDeVille = 46;
        public const long KiaSoul = 60;
        public const long VolkswagenGolf = 103;
    }

    public class CarModel
    {
        [DisplayName("Brand")]
        public long BrandId { get; set; }

        [DisplayName("Model")]
        public long ModelId { get; set; }
    }
}
