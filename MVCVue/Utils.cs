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
        public static string CarsJson = $"{nameof(MVCVue)}.cars.json";

        public static async Task<string> GetResourceContent(string resourceName)
        {
            var assembly = Assembly.GetExecutingAssembly();

            using (var stream = assembly.GetManifestResourceStream(resourceName))
            using (var reader = new StreamReader(stream))
            {
                return await reader.ReadToEndAsync();
            }
        }

        private static List<Car> _cars;
        public static async Task<List<Car>> GetCars()
        {
            if (_cars != null) return _cars;

            var json = await GetResourceContent(CarsJson);
            _cars = json.FromJson<List<Car>>();

            return _cars;
        }
    }
}
