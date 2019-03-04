using System.Collections.Generic;

namespace MVCVue.Models
{
    public class Car
    {
        public long BrandId { get; set; }
        public string BrandName { get; set; }
        public bool Current { get; set; }

        public List<Model> Models { get; set; }
    }

    public class Model
    {
        public long ModelId { get; set; }
        public string ModelName { get; set; }
        public bool Current { get; set; }
    }
}
