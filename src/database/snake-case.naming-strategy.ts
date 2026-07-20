import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm';

function toSnakeCase(input: string): string {
  return input
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/([A-Z])([A-Z])(?=[a-z])/g, '$1_$2')
    .toLowerCase();
}

export class SnakeCaseNamingStrategy
  extends DefaultNamingStrategy
  implements NamingStrategyInterface
{
  columnName(
    propertyName: string,
    customName: string,
    embeddedPrefixes: string[],
  ): string {
    const name = customName || toSnakeCase(propertyName);
    return embeddedPrefixes.length
      ? toSnakeCase(embeddedPrefixes.join('_')) + '_' + name
      : name;
  }

  relationName(propertyName: string): string {
    return toSnakeCase(propertyName);
  }

  joinColumnName(relationName: string, referencedColumnName: string): string {
    return toSnakeCase(`${relationName}_${referencedColumnName}`);
  }

  joinTableName(firstTableName: string, secondTableName: string): string {
    return toSnakeCase(`${firstTableName}_${secondTableName}`);
  }

  joinTableColumnName(
    tableName: string,
    propertyName: string,
    columnName?: string,
  ): string {
    return toSnakeCase(`${tableName}_${columnName || propertyName}`);
  }
}
