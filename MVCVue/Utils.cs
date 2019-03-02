using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Threading.Tasks;
using MVCVue.Models;
using ServiceStack;

namespace MVCVue
{
    public static class Utils
    {
        public static string BrandModels = $"{nameof(MVCVue)}.car-brand-model.json";

        public static async Task<string> GetResourceContent(string resourceName)
        {
            var assembly = Assembly.GetExecutingAssembly();

            using (var stream = assembly.GetManifestResourceStream(resourceName))
            using (var reader = new StreamReader(stream))
            {
                return await reader.ReadToEndAsync();
            }
        }

        private static List<BrandModel> _brandModels;
        public static async Task<IEnumerable<BrandModel>> GetBrandModels()
        {
            if (_brandModels != null) return _brandModels;

            var json = await GetResourceContent(BrandModels);
            _brandModels = json.FromJson<List<BrandModel>>();
            return _brandModels;
        }
    }
}
