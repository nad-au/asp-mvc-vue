using System.IO;
using System.Reflection;
using System.Threading.Tasks;

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
    }
}
